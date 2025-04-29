import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { DocumentDTO } from "@dti-isin/backend-api-client";
import { useState } from "react";
import FilePreview from "../../pages/document-uploader/FilePreview.tsx";
import { useGetFileContentByDocumentId } from "../../hook/backend/useGetFileContentByDocumentId.ts";
import CertificationBadge from "../CertificationBadge.tsx";

interface MyDocumentRowProps {
  document: DocumentDTO;
}

const MyDocumentRow = ({ document }: MyDocumentRowProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const { data: documentContent } = useGetFileContentByDocumentId(document.id!);

  return (
    <>
      <tr className="hover:bg-base-200 transition-colors">
        <td>
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-6 h-6 text-primary" />
            <div>
              <div className="font-bold">{document.title}</div>
              <div className="text-sm text-gray-500">
                {documentContent && (documentContent.size / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>
        </td>
        <td>{new Date(document.uploadTimestamp!).toLocaleDateString()}</td>
        <td>
          <CertificationBadge docHash={document.hash!} />
        </td>
        <td>
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-ghost btn-sm"
          >
            Preview
          </button>
        </td>
      </tr>

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
