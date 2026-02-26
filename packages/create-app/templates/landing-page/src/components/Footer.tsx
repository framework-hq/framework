import { config } from "../config";
import { Twitter, Github, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="section-padding container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg">{config.siteName}</h3>
            <p className="mt-1 text-sm">
              © {currentYear} {config.siteName}. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {config.social.twitter && (
              <a
                href={config.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {config.social.github && (
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {config.social.discord && (
              <a
                href={config.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Built with FrameWork badge */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <a
            href="https://github.com/framework-hq/framework"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            Built with <span className="text-indigo-400">FrameWork</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
