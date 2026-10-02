# GitHub-managed custom knowledge

Place trusted supplementary Lunarion notes, examples, and project documentation in this directory. Supported file extensions: `.md`, `.txt`, `.lua`, and `.json`.

Lunae reads committed files from this directory when answering relevant questions. There is intentionally no Discord upload command or runtime write interface; manage knowledge through reviewed GitHub commits only.

The main `knowledge/Lunarion.lua` source remains authoritative for documented API names, parameters, and behavior. Keep custom files relevant, and do not include secrets, private user data, or prompt instructions. Limit write access to trusted maintainers and review changes before merging. Redeploy or restart Lunae after commits so the running instance receives the updated repository contents.