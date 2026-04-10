import os
import pytest
from scripts.seo_automation import generate_article_text

def test_generate_article_text_is_humanized():
    # Test that the text avoids common AI slop
    topic = "Vertical AI Agents for M&A Due Diligence"
    text = generate_article_text(topic, [])
    
    slop_phrases = [
        "In the ever-evolving landscape", 
        "It's important to note", 
        "In conclusion",
        "Let's dive in",
        "unlock the potential",
        "game-changer"
    ]
    for phrase in slop_phrases:
        assert phrase.lower() not in text.lower(), f"Found AI slop: {phrase}"

def test_generate_article_text_includes_links():
    # Test that the text includes links to existing pages
    topic = "Private LLMs for Founders"
    existing_pages = [
        {"id": "what-is-an-ai-os", "title": "What is an AI OS"},
        {"id": "ceos-guide-to-ai-audits", "title": "The CEO's Guide to AI Audits"}
    ]
    text = generate_article_text(topic, existing_pages)
    
    assert "what-is-an-ai-os" in text
    assert "ceos-guide-to-ai-audits" in text
