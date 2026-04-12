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


def test_slugify_topic_handles_symbols():
    module = load_module()
    assert module.slugify_topic('AI GTM Copilots: 2026 Playbook') == 'ai-gtm-copilots-2026-playbook'


def test_extract_existing_article_ids_finds_wiki_entries():
    module = load_module()
    sample = """
const articles = [
  { id: 'what-is-an-ai-os', title: 'What' },
  { id: 'ceos-guide-to-ai-audits', title: 'Guide' }
];
"""
    ids = module.extract_existing_article_ids(sample)
    assert ids == {'what-is-an-ai-os', 'ceos-guide-to-ai-audits'}
