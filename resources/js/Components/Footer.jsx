import { BookOpen } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <Link href="/" className="inline-flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00BFAE] to-[#009A8E] rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold">My Reports</span>
                </Link>
                <p className="text-gray-400">جميع الحقوق محفوظة 2025 © My Reports</p>
            </div>
        </footer>
    );
} 