import logging
import networkx as nx
from typing import Dict, List, Any
from app.config import settings
from app.nlp.skill_taxonomy import SKILL_TAXONOMY, get_dimension_name

logger = logging.getLogger(__name__)

class SkillGraphService:
    def __init__(self):
        self.driver = None
        self._init_neo4j()
        self._init_fallback_networkx_graph()

    def _init_neo4j(self):
        try:
            from neo4j import GraphDatabase
            self.driver = GraphDatabase.driver(
                settings.NEO4J_URI,
                auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
            )
            logger.info("Connected to Neo4j graph database.")
        except Exception as e:
            logger.warning(f"Neo4j driver connection skipped ({e}). Using NetworkX graph fallback.")
            self.driver = None

    def _init_fallback_networkx_graph(self):
        self.nx_graph = nx.Graph()

        # Add dimension nodes
        dimensions = ["maths_stats", "coding", "ai_ml", "dashboard_storytelling", "big_data"]
        for d in dimensions:
            self.nx_graph.add_node(d, label=get_dimension_name(d), type="dimension")

        # Add skill nodes and BELONGS_TO edges
        for dim_key, clusters in SKILL_TAXONOMY.items():
            for cluster_name, skills in clusters.items():
                for skill in skills:
                    skill_id = skill.lower()
                    self.nx_graph.add_node(skill_id, label=skill.title(), type="skill", dimension=dim_key)
                    self.nx_graph.add_edge(skill_id, dim_key, weight=1.0, type="BELONGS_TO")

        # Add cross-skill complementary edges
        complementary_pairs = [
            ("python", "pytorch", 0.95),
            ("python", "pandas", 0.98),
            ("python", "scikit-learn", 0.96),
            ("sql", "tableau", 0.88),
            ("sql", "bigquery", 0.92),
            ("apache spark", "pyspark", 0.99),
            ("apache spark", "hadoop", 0.85),
            ("linear algebra", "machine learning", 0.90),
            ("a/b testing", "data storytelling", 0.86),
            ("powerbi", "tableau", 0.82)
        ]

        for s1, s2, w in complementary_pairs:
            if self.nx_graph.has_node(s1) and self.nx_graph.has_node(s2):
                self.nx_graph.add_edge(s1, s2, weight=w, type="COMPLEMENTARY_TO")

    def get_skill_adjacency_graph(self) -> Dict[str, Any]:
        """
        Returns JSON format of nodes and edges for frontend visualization.
        """
        nodes = []
        edges = []

        for node_id, attrs in self.nx_graph.nodes(data=True):
            nodes.append({
                "id": node_id,
                "label": attrs.get("label", node_id),
                "type": attrs.get("type", "skill"),
                "dimension": attrs.get("dimension")
            })

        for u, v, attrs in self.nx_graph.edges(data=True):
            edges.append({
                "source": u,
                "target": v,
                "weight": attrs.get("weight", 1.0),
                "type": attrs.get("type", "COMPLEMENTARY_TO")
            })

        return {"nodes": nodes, "edges": edges}

    def close(self):
        if self.driver:
            self.driver.close()

skill_graph_service = SkillGraphService()
