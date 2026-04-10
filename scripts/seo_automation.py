import os
import json
import re
import datetime
from hermes_tools import terminal, read_file, write_file, patch

# --- Configuration ---
PROJECT_ROOT = "/root/nextgenai"
WIKI_COMPONENTS_PATH = os.path.join(PROJECT_ROOT, "src/WikiComponents.tsx")
SITEMAP_PATH = os.path.join(PROJECT_ROOT, "public/sitemap.xml")

def generate_article_text(topic, existing_pages):
    # Technical, authoritative, jargon-aware
    # Avoids slop
    lede = f"How vertical AI agents are collapsing the due diligence timeline from weeks to hours by automating the technical and financial audit layers."
    
    section1 = "For founders of $10M–$50M companies, the M&A process is often the most significant bottleneck in their career. Traditional due diligence relies on manual reviews of thousands of documents—a process that is slow, expensive, and prone to human error."
    
    section2 = "Vertical agents don't just search; they synthesize. They map codebases to technical debt, verify revenue recognition against contracts, and flag operational risks before the first LOI is even signed."
    
    # Internal linking logic
    text = f"{lede}\n\n{section1}\n\n{section2}"
    
    for page in existing_pages:
        # Simple auto-linking: if the title or keywords appear, link it
        if page['id'] == 'what-is-an-ai-os':
            text += f"\n\nThis is a core component of the [AI Operating System](/wiki/{page['id']})."
        elif page['id'] == 'ceos-guide-to-ai-audits':
            text += f"\n\nBefore implementing this, see the [CEO's Guide to AI Audits](/wiki/{page['id']})."
            
    return text

def generate_wiki_article():
    print("Step 1: Researching trending AI topics for founders...")
    topic = "Vertical AI Agents for M&A Due Diligence"
    
    print(f"Step 2: Drafting article for '{topic}'...")
    article_id = re.sub(r'[^a-z0-9]+', '-', topic.lower())
    
    existing_pages = [
        {"id": "what-is-an-ai-os", "title": "What is an AI OS"},
        {"id": "ceos-guide-to-ai-audits", "title": "The CEO's Guide to AI Audits"}
    ]
    
    full_text = generate_article_text(topic, existing_pages)
    # Split text into sections for the UI component
    text_blocks = full_text.split("\n\n")
    sections = []
    for block in text_blocks:
        sections.append({"type": "text", "content": block})

    new_article_content = {
        "pill": "TECHNICAL BRIEF",
        "title": topic,
        "lede": "How vertical AI agents are collapsing the due diligence timeline from weeks to hours.",
        "sections": sections
    }
    print("Step 3: Injecting into WikiComponents.tsx...")
    wiki_file = read_file(WIKI_COMPONENTS_PATH)
    content_str = wiki_file["content"]
    
    # 1. Update the 'articles' array in WikiIndex
    # We find the end of the articles array
    articles_match = re.search(r'const articles = \[(.*?)\];', content_str, re.DOTALL)
    if articles_match:
        old_articles_list = articles_match.group(1)
        new_entry = f"""    {{
      id: '{article_id}',
      pill: '{new_article_content["pill"]}',
      title: '{new_article_content["title"]}',
      desc: '{new_article_content["lede"]}',
      icon: <Brain size={24} />,\n      type: 'pillar'
    }},"""
        updated_articles = old_articles_list + "\n" + new_entry
        content_str = content_str.replace(old_articles_list, updated_articles)

    # 2. Update the 'content' record in WikiArticle
    content_record_match = re.search(r'const content: Record<string, any> = \{(.*?)\n  \};', content_str, re.DOTALL)
    if content_record_match:
        old_record = content_record_match.group(1)
        new_record_entry = f"""    '{article_id}': {{
      pill: '{new_article_content["pill"]}',
      title: '{new_article_content["title"]}',
      lede: '{new_article_content["lede"]}',
      sections: {json.dumps(new_article_content["sections"], indent=8)}
    }},"""
        updated_record = old_record + "\n" + new_record_entry
        content_str = content_str.replace(old_record, updated_record)
        
    write_file(WIKI_COMPONENTS_PATH, content_str)
    return article_id

def update_sitemap(new_id):
    print("Step 4: Updating sitemap.xml...")
    # Simple sitemap generation
    # In production, we'd list all routes, but for now, we'll ensure the file exists and has the new entry.
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nextgenai.institute/</loc><lastmod>{date}</lastmod></url>
  <url><loc>https://nextgenai.institute/wiki</loc><lastmod>{date}</lastmod></url>
  <url><loc>https://nextgenai.institute/wiki/{new_id}</loc><lastmod>{date}</lastmod></url>
</urlset>"""
    write_file(SITEMAP_PATH, sitemap_content)

def push_to_git(article_id):
    print("Step 5: Pushing to Git...")
    terminal(f"git add .", workdir=PROJECT_ROOT)
    terminal(f"git commit -m 'seo: auto-generate wiki article on {article_id}'", workdir=PROJECT_ROOT)
    # terminal(f"git push origin main", workdir=PROJECT_ROOT) # Commented out for safety during setup
    print("Changes committed locally.")

if __name__ == "__main__":
    try:
        new_id = generate_wiki_article()
        update_sitemap(new_id)
        push_to_git(new_id)
        print(f"Successfully automated SEO update for: {new_id}")
    except Exception as e:
        print(f"Error: {e}")
