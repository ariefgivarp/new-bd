const Footer = () => {
    return (
        <footer className="w-full py-10 px-6 bg-white dark:bg-[#0b0b0b] text-gray-400 text-center text-sm">
            <div className="max-w-2xl mx-auto">
                <p>© 2025 Made with ♥ for Jesslyn Elly</p>
                <p className="mt-2">
                    &copy; {new Date().getFullYear()} Untuk [Jesslyn]. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
