import json
import sys
import os
import asyncio

# Add the project to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flow_claude.scripts.create_plan_branch import create_plan_branch

async def main():
    # Load tasks
    with open('tasks.json', 'r') as f:
        tasks = json.load(f)

    # Create the plan
    result = await create_plan_branch(
        session_name="terro-website",
        user_request="Build a multi-page static website for Terro AI using plain HTML/CSS/JavaScript with bold colorful visual style",
        tasks=tasks,
        design_doc="Dark theme with electric cyan, vibrant purple, and hot pink accents. Glassmorphism cards, gradient text headlines, scroll animations. 5 pages: Home, About, Technology, Use-Cases, Contact.",
        tech_stack="HTML5, CSS3, Vanilla JavaScript ES6"
    )

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
