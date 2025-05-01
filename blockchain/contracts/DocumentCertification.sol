// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract DocumentCertification is Initializable, AccessControlUpgradeable {
    struct Certification {
        bytes32 hash;
        address certifier;
        uint256 timestamp;
    }

    struct Revocation {
        address revoker;
        uint256 timestamp;
        string reason;
    }

    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");

    event DocumentCertified(bytes32 indexed docHash, address certifier);
    event CertificationRevoked(bytes32 indexed docHash, address revoker, string reason);

    mapping(bytes32 => Certification[]) private documentHistory;
    mapping(address => bytes32[]) private certificationsByAddress;
    mapping(bytes32 => Revocation[]) private documentRevocations;

    function initialize() public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CERTIFIER_ROLE, msg.sender);
    }

    function certifyDocuments(bytes32[] calldata hashes) public onlyRole(CERTIFIER_ROLE) {
        for (uint256 i = 0; i < hashes.length; i++) {
            bytes32 _docHash = hashes[i];
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
    }

    function revokeCertification(bytes32 _docHash, string memory _reason) public onlyRole(CERTIFIER_ROLE) {
        require(isDocumentCertified(_docHash), "Document not certified");
        require(bytes(_reason).length > 0, "Reason required");

        Certification[] storage history = documentHistory[_docHash];
        bool hasCertified = false;

        for (uint256 i = 0; i < history.length; i++) {
            if (history[i].certifier == msg.sender) {
                hasCertified = true;
                break;
            }
        }
        require(hasCertified, "You did not certify this document");

        documentRevocations[_docHash].push(Revocation({
            revoker: msg.sender,
            timestamp: block.timestamp,
            reason: _reason
        }));

        emit CertificationRevoked(_docHash, msg.sender, _reason);
    }


    function getRevocations(bytes32 _docHash) public view returns (Revocation[] memory) {
        return documentRevocations[_docHash];
    }

    function getRevocationsByUser(bytes32 _docHash, address user) public view returns (uint256) {
        Revocation[] storage revokes = documentRevocations[_docHash];
        uint256 count = 0;
        for (uint256 i = 0; i < revokes.length; i++) {
            if (revokes[i].revoker == user) {
                count++;
            }
        }
        return count;
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
