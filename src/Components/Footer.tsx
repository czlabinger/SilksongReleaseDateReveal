import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-auto bg-gray-100 text-center py-4">
          <span className="text-gray-600 text-sm">
            Percentage is calculated until 18th September 2025. This is based on <Link
                href="https://www.reddit.com/r/Silksong/comments/1kah2sp/skong_screenshot_shown_by_acmi_it_will_100_be_in/"
                className="text-blue-600 underline"
            >
                this Reddit post.
            </Link>
          </span>
        </footer>
      );
}

export default Footer;