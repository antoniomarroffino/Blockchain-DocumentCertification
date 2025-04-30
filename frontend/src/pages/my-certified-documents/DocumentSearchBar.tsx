'use client';

interface Props {
    searchTerm: string;
    onChange: (value: string) => void;
}

const DocumentSearchBar = ({ searchTerm, onChange }: Props) => {
    return (
        <div className="w-full">
            <input
                type="text"
                placeholder="Search documents by title..."
                value={searchTerm}
                onChange={(e) => onChange(e.target.value)}
                className="input input-bordered w-full bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500"
            />
        </div>
    );
};

export default DocumentSearchBar;
