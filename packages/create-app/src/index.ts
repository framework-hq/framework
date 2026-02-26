#!/usr/bin/env node

import { program } from "commander";
import prompts from "prompts";
import pc from "picocolors";
import { createProject } from "./create.js";
import { TEMPLATES } from "./templates.js";

const VERSION = "0.1.0";

program
  .name("create-framework")
  .description("Create a new FrameWork project")
  .version(VERSION)
  .argument("[project-name]", "Name of the project")
  .option("-t, --template <template>", "Template to use")
  .option("--skip-install", "Skip npm install")
  .action(async (projectName, options) => {
    console.log();
    console.log(pc.bold(pc.cyan("  FrameWork")));
    console.log(pc.dim("  Build internal tools without the bloat"));
    console.log();

    // Get project name if not provided
    if (!projectName) {
      const response = await prompts({
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: "my-app",
        validate: (value) =>
          value.length > 0 ? true : "Project name is required",
      });

      if (!response.projectName) {
        console.log(pc.red("Cancelled"));
        process.exit(1);
      }
      projectName = response.projectName;
    }

    // Select template
    let template = options.template;
    if (!template) {
      const response = await prompts({
        type: "select",
        name: "template",
        message: "Select a template:",
        choices: TEMPLATES.map((t) => ({
          title: `${t.name} ${pc.dim(`— ${t.description}`)}`,
          value: t.id,
        })),
      });

      if (!response.template) {
        console.log(pc.red("Cancelled"));
        process.exit(1);
      }
      template = response.template;
    }

    // Validate template
    const templateConfig = TEMPLATES.find((t) => t.id === template);
    if (!templateConfig) {
      console.log(pc.red(`Unknown template: ${template}`));
      console.log(
        `Available templates: ${TEMPLATES.map((t) => t.id).join(", ")}`
      );
      process.exit(1);
    }

    // Create project
    console.log();
    console.log(
      `Creating ${pc.cyan(projectName)} with ${pc.green(templateConfig.name)} template...`
    );
    console.log();

    try {
      await createProject({
        projectName,
        template: templateConfig,
        skipInstall: options.skipInstall,
      });

      console.log();
      console.log(pc.green("✓") + " Project created successfully!");
      console.log();
      console.log("Next steps:");
      console.log(pc.cyan(`  cd ${projectName}`));
      if (!options.skipInstall) {
        console.log(pc.cyan("  pnpm dev"));
      } else {
        console.log(pc.cyan("  pnpm install"));
        console.log(pc.cyan("  pnpm dev"));
      }
      console.log();

      // Show affiliate info if applicable
      if (templateConfig.affiliates && templateConfig.affiliates.length > 0) {
        console.log(pc.dim("─".repeat(50)));
        console.log();
        console.log(pc.dim("This template integrates with:"));
        for (const affiliate of templateConfig.affiliates) {
          console.log(`  • ${affiliate.name}: ${pc.blue(affiliate.url)}`);
        }
        console.log();
        console.log(
          pc.dim(
            "These are affiliate links. FrameWork may receive a commission."
          )
        );
        console.log(pc.dim("You can use any compatible provider."));
        console.log();
      }
    } catch (error) {
      console.error(pc.red("Failed to create project:"), error);
      process.exit(1);
    }
  });

program.parse();
