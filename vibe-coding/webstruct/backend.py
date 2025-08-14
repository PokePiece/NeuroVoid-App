# Category-based style presets
CATEGORY_STYLE_MAP = {
    "video": {
        "roof": {"style": "billboard-roof", "color": "#ff0000", "size": "large"},
        "walls": {"style": "glass-panels", "color": "#ffffff"},
        "decorations": [{"type": "sign", "text": None}, {"type": "data-stream-beam"}]
    },
    "news": {
        "roof": {"style": "flat-industrial", "color": "#444444", "size": "medium"},
        "walls": {"style": "red-brick", "color": "#ffffff"},
        "decorations": [{"type": "sign", "text": None}, {"type": "satellite-dish"}]
    },
    "ecommerce": {
        "roof": {"style": "glass-dome", "color": "#00ccff", "size": "medium"},
        "walls": {"style": "neon-frames", "color": "#ffcc00"},
        "decorations": [{"type": "sign", "text": None}, {"type": "market-stalls"}]
    },
    "social": {
        "roof": {"style": "pagoda-tiered", "color": "#ff66cc", "size": "large"},
        "walls": {"style": "glass-panels", "color": "#cccccc"},
        "decorations": [{"type": "sign", "text": None}, {"type": "drone-swarm"}]
    },
    "reference": {
        "roof": {"style": "gabled-classic", "color": "#888888", "size": "medium"},
        "walls": {"style": "concrete-brutalist", "color": "#bbbbbb"},
        "decorations": [{"type": "sign", "text": None}, {"type": "satellite-dish"}]
    },
    "entertainment": {
        "roof": {"style": "billboard-roof", "color": "#ff9900", "size": "large"},
        "walls": {"style": "neon-frames", "color": "#ffffff"},
        "decorations": [{"type": "sign", "text": None}, {"type": "drone-swarm"}]
    },
    "tech": {
        "roof": {"style": "glass-dome", "color": "#00ccff", "size": "medium"},
        "walls": {"style": "glass-panels", "color": "#cccccc"},
        "decorations": [{"type": "sign", "text": None}, {"type": "rotating-billboard"}]
    },
    "other": {
        "roof": {"style": "flat-industrial", "color": "#999999", "size": "small"},
        "walls": {"style": "wooden-facade", "color": "#cccccc"},
        "decorations": [{"type": "sign", "text": None}]
    }
}



def apply_rank_adjustments(plan: dict, site: SiteInfo) -> dict:
    plan = plan.copy()
    rank = site.rank

    # Top 5 sites → gold roofs, large size
    if rank <= 5:
        plan["roof"]["color"] = "gold"
        plan["roof"]["size"] = "large"
    elif rank <= 20:
        plan["roof"]["size"] = "medium"
    else:
        plan["roof"]["size"] = plan["roof"].get("size", "small")

    # Always set sign text to site name
    for deco in plan["decorations"]:
        if deco.get("type") == "sign":
            deco["text"] = site.name

    return plan

def generate_local_building_plan(site: SiteInfo):
    base_plan = CATEGORY_STYLE_MAP.get(site.category or "other", CATEGORY_STYLE_MAP["other"])
    return apply_rank_adjustments(base_plan, site)
