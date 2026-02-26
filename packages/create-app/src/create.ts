import { execSync } from "child_process";
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import type { Template } from "./templates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface CreateOptions {
  projectName: string;
  template: Template;
  skipInstall?: boolean;
}

export async function createProject(options: CreateOptions): Promise<void> {
  const { projectName, template, skipInstall } = options;
  const targetDir = join(process.cwd(), projectName);

  // Check if directory exists
  if (existsSync(targetDir)) {
    throw new Error(`Directory ${projectName} already exists`);
  }

  // Find template source
  // In development: look relative to this file
  // In production: look in node_modules
  let templateDir = join(__dirname, "../../..", "templates", template.source);
  
  if (!existsSync(templateDir)) {
    // Try production path
    templateDir = join(__dirname, "../templates", template.source);
  }
  
  if (!existsSync(templateDir)) {
    throw new Error(`Template ${template.id} not found at ${templateDir}`);
  }

  // Create project directory
  console.log(pc.dim(`  Creating directory...`));
  mkdirSync(targetDir, { recursive: true });

  // Copy template files
  console.log(pc.dim(`  Copying template files...`));
  cpSync(templateDir, targetDir, {
    recursive: true,
    filter: (src) => {
      // Skip node_modules and lock files
      return !src.includes("node_modules") && 
             !src.endsWith("pnpm-lock.yaml") &&
             !src.endsWith("package-lock.json") &&
             !src.endsWith("yarn.lock");
    },
  });

  // Update package.json with project name
  const packageJsonPath = join(targetDir, "package.json");
  if (existsSync(packageJsonPath)) {
    console.log(pc.dim(`  Updating package.json...`));
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName;
    packageJson.version = "0.1.0";
    delete packageJson.framework; // Remove internal metadata
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Create .gitignore if doesn't exist
  const gitignorePath = join(targetDir, ".gitignore");
  if (!existsSync(gitignorePath)) {
    writeFileSync(
      gitignorePath,
      `node_modules/
dist/
.env
.env.local
.DS_Store
`
    );
  }

  // Create .env from .env.example
  const envExamplePath = join(targetDir, ".env.example");
  const envPath = join(targetDir, ".env");
  if (existsSync(envExamplePath) && !existsSync(envPath)) {
    cpSync(envExamplePath, envPath);
    console.log(pc.dim(`  Created .env from .env.example`));
  }

  // Install dependencies
  if (!skipInstall) {
    console.log(pc.dim(`  Installing dependencies...`));
    try {
      execSync("pnpm install", {
        cwd: targetDir,
        stdio: "inherit",
      });
    } catch {
      console.log(
        pc.yellow("  pnpm install failed. You may need to run it manually.")
      );
    }
  }

  // Initialize git
  console.log(pc.dim(`  Initializing git repository...`));
  try {
    execSync("git init", { cwd: targetDir, stdio: "pipe" });
    execSync("git add -A", { cwd: targetDir, stdio: "pipe" });
    execSync('git commit -m "Initial commit from create-framework"', {
      cwd: targetDir,
      stdio: "pipe",
    });
  } catch {
    // Git init failed, not critical
  }
}
