# hugo-is-hungry
Hugo project for recipes

## Local Development

Build and start the server locally with:

```bash
hugo server -D --port 1313 --enableGitInfo
```

## PR Preview Setup

This repository supports automatic PR previews using GitHub Pages:

### GitHub Pages Setup
1. Enable GitHub Pages in your repository settings
2. Set source to "GitHub Actions" 
3. The `pr-preview.yml` workflow is ready to use
4. No additional secrets or external services required!

## How PR Previews Work

When you create or update a pull request:
- 🚀 A preview deployment is automatically created
- 💬 A comment is added to your PR with the preview link  
- 🔄 The preview updates with each new commit
- 🧹 The preview is cleaned up when the PR is closed/merged

## Troubleshooting 404 Issues

If you get 404 errors:
1. **Check GitHub Pages settings**: Ensure Pages is enabled and set to "GitHub Actions"
2. **Verify deployment**: Check GitHub Actions logs for build errors  
3. **Wait for propagation**: GitHub Pages can take a few minutes to update
4. **Check baseURL**: The workflow uses the correct baseURL for your site structure
