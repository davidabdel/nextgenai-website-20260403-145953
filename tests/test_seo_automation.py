import importlib.util
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = PROJECT_ROOT / 'scripts' / 'seo_automation.py'


def load_module():
    spec = importlib.util.spec_from_file_location('seo_automation', MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_module_imports_without_hermes_tools_dependency():
    module = load_module()
    assert hasattr(module, 'generate_article_text')


def test_pick_topic_avoids_existing_article_ids():
    module = load_module()
    chosen_topic, chosen_id = module.pick_topic({'vertical-ai-agents-for-m-a-due-diligence'})
    assert chosen_id != 'vertical-ai-agents-for-m-a-due-diligence'
    assert 'AI' in chosen_topic


def test_generated_article_uses_founders_playbook_voice_and_internal_links():
    module = load_module()
    text = module.generate_article_text(
        'AI Revenue Ops Command Centers',
        [
            {'id': 'what-is-an-ai-os', 'title': 'What is an AI Operating System (AI OS)?'},
            {'id': 'ceos-guide-to-ai-audits', 'title': "The CEO's Guide to AI Audits"},
        ],
    )

    assert 'founder' in text.lower()
    assert '/wiki/what-is-an-ai-os' in text
    assert '/wiki/ceos-guide-to-ai-audits' in text

    banned = ['in the ever-evolving landscape', "let's dive in", 'game-changer', 'in conclusion']
    assert all(phrase not in text.lower() for phrase in banned)


def test_build_sitemap_contains_new_wiki_url():
    module = load_module()
    xml = module.build_sitemap_xml(['what-is-an-ai-os', 'new-topic-ai-margin-expansion'], '2026-04-12')
    assert '<loc>https://nextgenai.institute/wiki/new-topic-ai-margin-expansion</loc>' in xml
    assert '<loc>https://nextgenai.institute/wiki/what-is-an-ai-os</loc>' in xml
