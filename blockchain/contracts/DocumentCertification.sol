// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract DocumentCertification is Initializable {
    function initialize() public initializer {}

    struct Certification {
        bytes32 hash;
        address certifier;
        uint256 timestamp;
    }

    event DocumentCertified(bytes32 _docHash, address certifier);

    mapping(bytes32 => Certification[]) private documentHistory;
    mapping(address => bytes32[]) private certificationsByAddress;

    function certifyDocument(bytes32 _docHash) public {
        require(_docHash != bytes32(0), "Invalid hash");

        Certification memory certification = Certification({
            hash: _docHash,
            certifier: msg.sender,
            timestamp: block.timestamp
        });

        documentHistory[_docHash].push(certification);
        certificationsByAddress[msg.sender].push(_docHash);

        emit DocumentCertified(_docHash, msg.sender);
    }

    function isDocumentCertified(bytes32 _docHash) public view returns (bool) {
        return documentHistory[_docHash].length > 0;
    }

    function getCertifierOf(bytes32 _docHash) public view returns (address) {
        uint256 len = documentHistory[_docHash].length;
        require(len > 0, "Not certified");
        return documentHistory[_docHash][len - 1].certifier;
    }

    function getLastCertification(bytes32 _docHash) public view returns (
        bytes32 hash,
        address certifier,
        uint256 timestamp
    ) {
        uint256 len = documentHistory[_docHash].length;
        require(len > 0, "No certifications");
        Certification memory cert = documentHistory[_docHash][len - 1];
        return (cert.hash, cert.certifier, cert.timestamp);
    }

    function getDocumentHistoryFlat(bytes32 _docHash) public view returns (
        address[] memory certifiers,
        uint256[] memory timestamps,
        bytes32[] memory hashes
    ) {
        Certification[] storage history = documentHistory[_docHash];
        uint256 len = history.length;

        certifiers = new address[](len);
        timestamps = new uint256[](len);
        hashes = new bytes32[](len);

        for (uint256 i = 0; i < len; i++) {
            certifiers[i] = history[i].certifier;
            timestamps[i] = history[i].timestamp;
            hashes[i] = history[i].hash;
        }

        return (certifiers, timestamps, hashes);
    }

    function getCertifiedDocumentsByAddress(address _certifier) public view returns (bytes32[] memory) {
        return certificationsByAddress[_certifier];
    }
}
