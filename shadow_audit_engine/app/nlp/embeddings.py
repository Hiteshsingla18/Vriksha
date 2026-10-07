import numpy as np
from typing import List, Union
import logging

logger = logging.getLogger(__name__)

_model = None

def get_transformer_model():
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            from app.config import settings
            logger.info(f"Loading SentenceTransformer model: {settings.SENTENCE_TRANSFORMER_MODEL}")
            _model = SentenceTransformer(settings.SENTENCE_TRANSFORMER_MODEL)
        except Exception as e:
            logger.warning(f"Could not load SentenceTransformer ({e}). Falling back to TF-IDF vectorizer.")
            _model = "FALLBACK"
    return _model

def encode_text(text: Union[str, List[str]]) -> np.ndarray:
    model = get_transformer_model()
    if isinstance(text, str):
        text_list = [text]
    else:
        text_list = text

    if model != "FALLBACK":
        try:
            embeddings = model.encode(text_list, convert_to_numpy=True)
            if isinstance(text, str):
                return embeddings[0]
            return embeddings
        except Exception as e:
            logger.error(f"Error encoding text with SentenceTransformer: {e}")

    # Fallback embedding generation (384 dimensions using hashing vectorizer approach)
    from sklearn.feature_extraction.text import HashingVectorizer
    vectorizer = HashingVectorizer(n_features=384)
    vecs = vectorizer.fit_transform(text_list).toarray()
    # Normalize vectors
    norms = np.linalg.norm(vecs, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    vecs = vecs / norms
    if isinstance(text, str):
        return vecs[0]
    return vecs

def cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:
    v1 = np.asarray(v1, dtype=np.float32)
    v2 = np.asarray(v2, dtype=np.float32)
    
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
        
    sim = np.dot(v1, v2) / (norm_v1 * norm_v2)
    return float(np.clip(sim, 0.0, 1.0))
