import datetime
import os
import re
import subprocess
from typing import Iterable

# --- Configuration ---
PROJECT_ROOT = "/root/nextgenai"
WIKI_COMPONENTS_PATH = os.path.join(PROJECT_ROOT, "src/WikiComponents.tsx")
SITEMAP_PATH = os.path.join(PROJECT_ROOT, "public/sitemap.xml")
BASE_URL = "https://nextgenai.institute"


def slugify_topic(topic: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", topic.lower()).strip("-")


def extract_existing_article_ids(wiki_content: str) -> set[str]:
    match = re.search(r"const articles = \[(.*?)\];", wiki_content, re.DOTALL)
    if not match:
        return set()
    return set(re.findall(r"id:\s*'([^']+)'", match.group(1)))


def extract_existing_pages(wiki_content: str) -> list[dict[str, str]]:
    article_block = re.search(r"const articles = \[(.*?)\];", wiki_content, re.DOTALL)
    if not article_block:
        return []

    entries = re.findall(
        r"\{\s*id:\s*'([^']+)'\s*,\s*pill:\s*'[^']*'\s*,\s*title:\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")",
        article_block.group(1),
        re.DOTALL,
    )

    pages = []
    for page_id, title_literal in entries:
        title = title_literal[1:-1]
        pages.append({"id": page_id, "title": title})
    return pages


def get_trending_or_founder_topics() -> list[str]:
    # No external web-search dependency in this runtime. Use founder-high-value topics.
    return [
        "AI Revenue Ops Command Centers",
        "Private LLM Stack for Regulated Mid-Market Teams",
        "Agentic FP&A for Weekly Cashflow Command",
        "Voice AI for Founder-Led Sales Orchestration",
        "AI Margin Expansion Systems for Service Businesses",
    ]


def pick_topic(existing_ids: set[str]) -> tuple[str, str]:
    for topic in get_trending_or_founder_topics():
        article_id = slugify_topic(topic)
        if article_id not in existing_ids:
            return topic, article_id
    date_suffix = datetime.datetime.now().strftime("%Y%m%d")
    fallback_topic = f"Founder AI Operating Cadence {date_suffix}"
    return fallback_topic, slugify_topic(fallback_topic)


def generate_article_text(topic: str, existing_pages: list[dict[str, str]]) -> str:
    # Technical but accessible 'humanizer' persona
    blocks = [
        f"{topic} represents the next evolution of the founder's operating system—moving beyond simple task automation into true cognitive leverage.",
        "For founders scaling past $10M, the bottleneck is rarely talent; it is the latency between signal and action. When your revenue data lives in one silo and your operational capacity in another, you aren't running a business—you're managing a series of expensive guesses.",
        "A premium AI implementation doesn't just 'do work'; it collapses the distance between your strategic intent and the execution layer. By installing event-driven data listeners and role-specific agentic loops, you convert passive monitoring into active governance. This is how you reclaim 20+ hours a week while improving decision quality.",
        "This isn't about replacing your team; it's about upgrading their operating environment so they can execute at 10x speed without the 10x burnout.",
    ]

    page_ids = {p["id"] for p in existing_pages}
    # Auto-link logic for key pillars
    links = []
    if "what-is-an-ai-os" in page_ids:
        links.append("This framework integrates directly with your [AI Operating System (AI OS)](/wiki/what-is-an-ai-os).")
    if "ceos-guide-to-ai-audits" in page_ids:
        links.append("Before deployment, ensure you've completed the baseline [AI Audit](/wiki/ceos-guide-to-ai-audits) to identify your highest-leverage bottlenecks.")
    
    if links:
        blocks.append(" ".join(links))

    return "\n\n".join(blocks)


def make_article_payload(topic: str, body_text: str) -> dict:
    sections = [{"type": "text", "content": block} for block in body_text.split("\n\n") if block.strip()]
    return {
        "pill": "FOUNDERS PLAYBOOK",
        "title": topic,
        "lede": "A premium operating brief for founders building durable AI leverage.",
        "desc": "How to implement technical AI systems that improve speed, margin, and governance.",
        "sections": sections,
    }


def _inject_into_articles_block(content: str, article_id: str, payload: dict) -> str:
    articles_match = re.search(r"const articles = \[(.*?)\n  \];", content, re.DOTALL)
    if not articles_match:
        raise RuntimeError("Could not find articles array in WikiComponents.tsx")

    old_articles_list = articles_match.group(1)
    if f"id: '{article_id}'" in old_articles_list:
        return content

    new_entry = f"""
    {{
      id: '{article_id}',
      pill: '{payload['pill']}',
      title: '{payload['title']}',
      desc: '{payload['desc']}',
      icon: <Brain size={{24}} />,
      type: 'pillar'
    }},"""

    updated_articles = new_entry + old_articles_list
    return content.replace(old_articles_list, updated_articles, 1)


def _inject_into_content_record(content: str, article_id: str, payload: dict) -> str:
    record_match = re.search(r"const content: Record<string, any> = \{(.*?)\n  \};", content, re.DOTALL)
    if not record_match:
        raise RuntimeError("Could not find content record in WikiComponents.tsx")

    old_record = record_match.group(1)
    if f"'{article_id}':" in old_record:
        return content

    section_lines = []
    for section in payload["sections"]:
        section_lines.append(
            "        {\n"
            "          type: 'text',\n"
            f"          content: {repr(section['content'])}\n"
            "        }"
        )

    new_record_entry = (
        f"\n    '{article_id}': {{\n"
        f"      pill: '{payload['pill']}',\n"
        f"      title: '{payload['title']}',\n"
        f"      lede: '{payload['lede']}',\n"
        "      sections: [\n"
        + ",\n".join(section_lines)
        + "\n      ]\n"
        "    },"
    )

    updated_record = new_record_entry + old_record
    return content.replace(old_record, updated_record, 1)


def update_wiki_components() -> tuple[str, list[str]]:
    with open(WIKI_COMPONENTS_PATH, "r", encoding="utf-8") as f:
        original = f.read()

    existing_ids = extract_existing_article_ids(original)
    existing_pages = extract_existing_pages(original)
    topic, article_id = pick_topic(existing_ids)

    body = generate_article_text(topic, existing_pages)
    payload = make_article_payload(topic, body)

    updated = _inject_into_articles_block(original, article_id, payload)
    updated = _inject_into_content_record(updated, article_id, payload)

    with open(WIKI_COMPONENTS_PATH, "w", encoding="utf-8") as f:
        f.write(updated)

    all_ids = extract_existing_article_ids(updated)
    return article_id, sorted(all_ids)


def build_sitemap_xml(article_ids: Iterable[str], date_str: str) -> str:
    static_urls = [
        f"{BASE_URL}/",
        f"{BASE_URL}/wiki",
    ]
    wiki_urls = [f"{BASE_URL}/wiki/{article_id}" for article_id in sorted(set(article_ids))]
    all_urls = static_urls + wiki_urls

    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url in all_urls:
        lines.append(f"  <url><loc>{url}</loc><lastmod>{date_str}</lastmod></url>")
    lines.append("</urlset>")
    return "\n".join(lines)


def update_sitemap(article_ids: list[str]) -> None:
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    xml = build_sitemap_xml(article_ids, today)
    with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
        f.write(xml)


def run_git(command: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(command, cwd=PROJECT_ROOT, text=True, capture_output=True)


def commit_and_push(article_id: str) -> None:
    run_git(["git", "checkout", "main"])
    add_result = run_git(["git", "add", "scripts/seo_automation.py", "src/WikiComponents.tsx", "public/sitemap.xml", "tests/test_seo_automation.py", "tests/test_content_generation.py"])
    if add_result.returncode != 0:
        raise RuntimeError(add_result.stderr.strip() or "git add failed")

    commit_result = run_git(["git", "commit", "-m", f"seo: auto-generate wiki article on {article_id}"])
    if commit_result.returncode != 0 and "nothing to commit" not in commit_result.stdout.lower():
        raise RuntimeError(commit_result.stderr.strip() or commit_result.stdout.strip() or "git commit failed")

    # PUSH TO BOTH main AND feature/webhook-integration
    push_main = run_git(["git", "push", "origin", "main"])
    if push_main.returncode != 0:
        raise RuntimeError(push_main.stderr.strip() or "git push main failed")

    push_feature = run_git(["git", "push", "origin", "main:feature/webhook-integration"])
    if push_feature.returncode != 0:
        raise RuntimeError(push_feature.stderr.strip() or "git push feature branch failed")


def main() -> None:
    print("Step 1: Researching trending AI topics (founder-priority fallback set)...")
    print("Step 2: Generating new wiki article in Founders Playbook voice...")
    article_id, all_ids = update_wiki_components()

    print("Step 3: Updating sitemap.xml...")
    update_sitemap(all_ids)

    print("Step 4: Committing and pushing to main...")
    commit_and_push(article_id)

    print(f"Successfully automated SEO update for: {article_id}")


if __name__ == "__main__":
    main()
