import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-auto text-center py-4">
            {/* <span className="text-gray-600 text-sm">
                Percentage is calculated until 25th December 2025. This is based on{" "}
                <Link
                    href="https://www.reddit.com/r/Silksong/comments/1l6k3vt/thank_you_leth/"
                    className="text-blue-600 underline"
                    target="_blank"
                >
                    this Reddit post / Discord message.
                </Link>
            </span> */}
            <br />

            <span className="text-gray-600 text-sm">
                All images where ethically sourced from{" "}
                <Link
                    href="https://www.reddit.com/r/Silksong/"
                    className="text-blue-600 underline"
                    target="_blank"
                >
                    r/Silksong
                </Link>
            </span>

            <br />
            <span className="text-gray-600 text-sm">
                The source code is available on{" "}
                <Link
                    href="https://www.github.com/czlabinger/SilksongReleaseDateReveal"
                    className="text-blue-600 underline"
                    target="_blank"
                >
                    GitHub
                </Link>
            </span>
        </footer>
    );
}

export default Footer;
