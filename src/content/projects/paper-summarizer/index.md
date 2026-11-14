---
title: Research Paper Summarizer
order: 6
context: Software
role: Built with Claude Code
status: Code on GitHub
categories: [Software]
period: Summer 2026
disciplines: [Python, LLM tooling]
summary: >-
  A Python tool that takes a research paper and gives back what you need to know: section summaries with
  the key methods, results and figures, without the long derivations. I built it at the start of summer
  2026, when I began reading papers for my lab work. It was my first serious Claude Code project.
objective: >-
  Make papers faster to get through by cutting the bloat, on either a paid API or a free local model.
tools: [Python, SQLite, Pydantic, Ollama, Anthropic API]
results:
  - Not in active use right now, mainly because I'm not reading many papers at the moment. I'd use it again
galleryLayout: stack
card: text
gallery:
  - { src: ./library.png, alt: 'The summarizer web app library view, listing saved papers with authors and venues and a full-text search box', label: Library, caption: Searchable library of summarized papers }
  - { src: ./extract.png, alt: 'The summarizer upload form: choose a PDF, pick the local Ollama or Anthropic backend, optional OCR, and save to library', label: Extract, caption: Upload a PDF and pick a backend }
links:
  - { label: View the code on GitHub, href: 'https://github.com/ycouby77/research-paper-summarizer' }
---

I built it with Claude Code.

## Why I built it

I was starting in the lab and reading a lot of papers, and it was a good first real project to build with Claude Code.

## What it does

You give it a PDF and it returns section summaries plus the important results, methods and figures. The paper's figures and tables are rendered as images you can click to zoom. It can run on the Anthropic API or for free on a local model through Ollama, and I mostly used the local model. Scanned PDFs can go through OCR first.

## How it is built

- A web interface with two tabs: one to extract a paper, one to search everything saved in the library
- Pydantic models for the structured summaries, stored in a local SQLite library with full-text search
- A provider-agnostic backend, so the local and cloud models are interchangeable
- A command-line version, and a start script so it launches with a double-click
