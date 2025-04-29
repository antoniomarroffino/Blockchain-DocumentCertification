'use client'

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { DocumentDTO } from "@dti-isin/backend-api-client";
import { useState } from "react";
import { motion } from 'framer-motion';
import FilePreview from "../document-uploader/FilePreview.tsx";
import { useGetFileContentByDocumentId } from "../../hook/backend/useGetFileContentByDocumentId.ts";
import CertificationBadge from "./CertificationBadge.tsx";

interface MyDocumentRowProps {
  document: DocumentDTO;
}

const MyDocumentRow = ({ document }: MyDocumentRowProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const { data: documentContent } = useGetFileContentByDocumentId(document.id!);

  return (
      <>
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hover:bg-neutral-700 transition-colors"
        >
          <td className="p-4">
            <div className="flex items-center gap-3">
              <DocumentTextIcon className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="font-bold text-white">{document.title}</div>
                <div className="text-sm text-neutral-400">
                  {documentContent && (documentContent.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
          </td>
          <td className="p-4 text-neutral-400">
            {new Date(document.uploadTimestamp!).toLocaleDateString()}
          </td>
          <td className="p-4">
            <CertificationBadge docHash={document.hash!} />
          </td>
          <td className="p-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn btn-ghost btn-sm text-yellow-400 hover:text-yellow-300"
                onClick={() => setShowPreview(true)}
            >
              Preview
            </motion.button>
          </td>
        </motion.tr>

        {showPreview && documentContent && (
            <FilePreview
                file={documentContent}
                onClose={() => setShowPreview(false)}
            />
        )}
      </>
  );
};

export default MyDocumentRow;
