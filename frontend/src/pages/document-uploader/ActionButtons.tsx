'use client'

import {motion} from 'framer-motion';

interface ActionButtonsProps {
    onPreview: () => void;
    onCancel: () => void;
    onConfirm: () => void;
}

const ActionButtons = ({onPreview, onCancel, onConfirm}: ActionButtonsProps) => {
    return (
        <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-4">
                <motion.button
                    whileHover={{scale: 1.05}}
                    className="btn bg-neutral-700 text-white hover:bg-neutral-600"
                    onClick={onPreview}
                >
                    Preview
                </motion.button>
                <motion.button
                    whileHover={{scale: 1.05}}
                    className="btn bg-red-600 text-white hover:bg-red-500"
                    onClick={onCancel}
                >
                    Cancel
                </motion.button>
            </div>
            <motion.button
                whileHover={{scale: 1.05}}
                className="btn bg-yellow-400 text-neutral-900 font-bold hover:bg-yellow-300 transition"
                onClick={onConfirm}
            >
                Confirm Upload
            </motion.button>
        </div>
    );
};

export default ActionButtons;
