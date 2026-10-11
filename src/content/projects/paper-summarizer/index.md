---
title: Research Paper Summarizer
order: 6
context: Software
period: '2026'
disciplines: [Python, LLM tooling]
summary: >-
  A Python desktop tool that summarizes research papers with an LLM, using a provider-agnostic backend
  (Ollama or Anthropic API), Pydantic data models, and SQLite storage.
tools: [Python, SQLite, Pydantic, LLM APIs]
galleryLayout: stack
gallery:
  - { src: ./library.png, alt: 'The summarizer web app library view, listing saved papers with authors and venues and a full-text search box', label: Library, caption: Searchable library of summarized papers }
  - { src: ./extract.png, alt: 'The summarizer upload form: choose a PDF, pick the local Ollama or Anthropic backend, optional OCR, and save to library', label: Extract, caption: Upload a PDF and pick a backend }
links:
  - { label: View the code on GitHub, href: 'https://github.com/ycouby77/research-paper-summarizer' }
---

- Provider-agnostic LLM backend: runs locally on Ollama or against the Anthropic API
- Pydantic models for structured summaries, persisted in SQLite
