from typing import Dict, List, Any

def simulate_ats_filtering(
    candidate_profile: Dict[str, Any],
    job_profile: Dict[str, Any],
    ats_config: Dict[str, Any] = None
) -> Dict[str, Any]:
    if ats_config is None:
        ats_config = {
            "enforce_min_experience": True,
            "enforce_title_match": True,
            "enforce_keyword_match": True,
            "custom_required_keywords": None
        }

    rejection_reasons = []

    # Rule 1: Experience Check
    cand_exp = candidate_profile.get("total_experience_years", 0.0)
    jd_min_exp = job_profile.get("min_experience", 0.0)

    if ats_config.get("enforce_min_experience", True) and jd_min_exp > 0:
        if cand_exp < jd_min_exp:
            rejection_reasons.append(
                f"Insufficient Experience: Has {cand_exp} yrs, JD requires minimum {jd_min_exp} yrs."
            )

    # Rule 2: Title Match Check
    cand_titles = candidate_profile.get("recent_job_titles", [])
    jd_title = job_profile.get("job_designation", "").lower()

    if ats_config.get("enforce_title_match", True) and jd_title:
        title_matched = False
        for title in cand_titles:
            t_lower = title.lower()
            # Simple keyword overlap check for rigid title match
            words_in_jd = set(w for w in jd_title.split() if len(w) > 3)
            words_in_cand = set(w for w in t_lower.split() if len(w) > 3)
            if words_in_jd and len(words_in_jd.intersection(words_in_cand)) > 0:
                title_matched = True
                break
        if not title_matched:
            rejection_reasons.append(
                f"Title Mismatch: Recent titles ({', '.join(cand_titles)}) do not match exact designation '{job_profile.get('job_designation')}'."
            )

    # Rule 3: Keyword Match Check
    req_keywords = ats_config.get("custom_required_keywords")
    if not req_keywords:
        req_keywords = job_profile.get("mandatory_keywords", [])

    if ats_config.get("enforce_keyword_match", True) and req_keywords:
        cand_skills_flat = []
        for s_list in candidate_profile.get("extracted_skills", {}).values():
            if isinstance(s_list, list):
                cand_skills_flat.extend(s_list)
        
        raw_text_lower = candidate_profile.get("raw_text", "").lower()
        missing_mandatory = []
        
        for kw in req_keywords[:4]:  # Top 4 required keywords
            if kw.lower() not in raw_text_lower and not any(kw.lower() in s.lower() for s in cand_skills_flat):
                missing_mandatory.append(kw)
                
        if missing_mandatory:
            rejection_reasons.append(
                f"Missing Mandatory Keywords: Lacks exact keyword matches ({', '.join(missing_mandatory)})."
            )

    # Final Decision
    is_filtered_out = len(rejection_reasons) > 0
    ats_status = "Filtered Out" if is_filtered_out else "Passed ATS"

    return {
        "candidate_id": candidate_profile.get("candidate_id"),
        "ats_status": ats_status,
        "is_filtered_out": is_filtered_out,
        "rejection_reasons": rejection_reasons
    }
