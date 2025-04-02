// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract DocumentCertification {
    constructor(){}

    struct Certification {
        bytes32 hash;
        address certifier;
        uint256 timestamp;
    }

    modifier isDocumentAlreadyCertified(bytes32 _docHash) {
        require(documentCertifications[_docHash].timestamp == 0, "Document already certified");
        _;
    }

    event DocumentCertified(bytes32 _docHash, address certifier);

    mapping(bytes32 => Certification) private documentCertifications;

    function certifyDocument(bytes32 _docHash) public isDocumentAlreadyCertified(_docHash){
        require(_docHash != bytes32(0), "Invalid hash");
        Certification memory certification = Certification(
            {
                hash: _docHash,
                certifier: msg.sender,
                timestamp: block.timestamp
            });

        documentCertifications[_docHash] = certification;
        emit DocumentCertified(_docHash, msg.sender);
    }

    function getCertification(bytes32 _docHash) public view returns (Certification memory) {
        return documentCertifications[_docHash];
    }

    function isCertifiedBy(address _certifier, bytes32 _docHash) public view returns(bool) {
        Certification memory certification = documentCertifications[_docHash];
        return certification.certifier == _certifier;
    }
}