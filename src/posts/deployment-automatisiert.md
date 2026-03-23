---
id: deployment-automatisiert
title: Automatisches Deployment mit GitHub Actions
date: 2026-03-13
summary: Jeder Merge in main löst Build, Image-Bau und Deployment aus.
previewImage: ./deployment-github-actions.png
tags: ["Coding mit AI", "CI/CD", "GitHub", "Render"]
---

Sobald ein Pull Request in den main-Branch gemergt wird, läuft die Pipeline durch: Lint, Build und Docker-Image-Build.

Render holt sich anschließend den aktuellen Stand aus dem Repository und deployed die neue Version.