import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {CheckIcon} from "@heroicons/react/16/solid";
import {Document} from "@dti-isin/backend-api-client"

interface MyDocumentRowProps {
    document: Document;
}

const MyDocumentRow = ({document} : MyDocumentRowProps) => {
    return (
        <tr key={document.id}>
            <td>
                <div className="flex items-center gap-3">
                    <DocumentTextIcon className="w-6 h-6 text-primary" />
                    <div>
                        <div className="font-medium">{document.title}</div>
                    </div>
                </div>
            </td>
            <td>{new Date(document.uploadTimestamp!).toLocaleDateString()}</td>
            <td>
                <div className="badge badge-success badge-lg gap-2">
                    <CheckIcon className="w-3 h-3" />
                    Certified
                </div>
            </td>
            <td>
                <button className="btn btn-ghost btn-xs">Details</button>
            </td>
        </tr>
    );
}

export default MyDocumentRow;