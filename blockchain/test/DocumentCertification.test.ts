import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { DocumentCertification__factory } from "../typechain-types";

describe("DocumentCertification", function () {
    async function deployFixture() {
        const [owner, certifier, other] = await ethers.getSigners();
        const factory = new DocumentCertification__factory(owner);
        const proxy = await upgrades.deployProxy(factory, []);
        await proxy.waitForDeployment();

        // Grant certifier role to certifier
        const CERTIFIER_ROLE = await proxy.CERTIFIER_ROLE();
        await proxy.grantRole(CERTIFIER_ROLE, certifier.address);

        return { proxy, owner, certifier, other, CERTIFIER_ROLE };
    }

    describe("Initialization", function () {
        it("should set correct initial roles", async function () {
            const { proxy, owner, CERTIFIER_ROLE } = await loadFixture(deployFixture);
            const DEFAULT_ADMIN_ROLE = await proxy.DEFAULT_ADMIN_ROLE();

            expect(await proxy.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
            expect(await proxy.hasRole(CERTIFIER_ROLE, owner.address)).to.be.true;
        });

        it("should start with no certifications", async function () {
            const { proxy } = await loadFixture(deployFixture);
            const randomHash = ethers.keccak256(ethers.toUtf8Bytes("random"));
            expect(await proxy.isDocumentCertified(randomHash)).to.be.false;
        });
    });

    describe("Document Certification", function () {
        const sampleHashes = [
            ethers.keccak256(ethers.toUtf8Bytes("doc1.pdf")),
            ethers.keccak256(ethers.toUtf8Bytes("doc2.pdf"))
        ];

        describe("certifyDocuments()", function () {
            it("should allow batch certification", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                await expect(proxy.connect(certifier).certifyDocuments(sampleHashes))
                    .to.emit(proxy, "DocumentCertified")
                    .withArgs(sampleHashes[0], certifier.address)
                    .to.emit(proxy, "DocumentCertified")
                    .withArgs(sampleHashes[1], certifier.address);
            });

            it("should reject certification from non-certifier", async function () {
                const { proxy, other, CERTIFIER_ROLE } = await loadFixture(deployFixture);
                await expect(
                    proxy.connect(other).certifyDocuments([sampleHashes[0]])
                ).to.be.revertedWithCustomError(
                    proxy,
                    "AccessControlUnauthorizedAccount"
                ).withArgs(
                    other.address,
                    CERTIFIER_ROLE
                );
            });

            it("should reject empty hash", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                await expect(proxy.connect(certifier).certifyDocuments([ethers.ZeroHash]))
                    .to.be.revertedWith("Invalid hash");
            });
        });

        describe("Document History", function () {
            it("should correctly track certification history", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                const hash = sampleHashes[0];

                await proxy.connect(certifier).certifyDocuments([hash]);
                const history = await proxy.getDocumentHistoryFlat(hash);

                expect(history.certifiers[0]).to.equal(certifier.address);
                expect(history.hashes[0]).to.equal(hash);
                expect(history.timestamps[0]).to.be.gt(0);
            });

            it("should return correct last certification", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                const hash = sampleHashes[0];

                await proxy.connect(certifier).certifyDocuments([hash]);
                const lastCert = await proxy.getLastCertification(hash);

                expect(lastCert.hash).to.equal(hash);
                expect(lastCert.certifier).to.equal(certifier.address);
                expect(lastCert.timestamp).to.be.gt(0);
            });
        });

        describe("Revocation", function () {
            it("should allow certification revocation with reason", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                const hash = sampleHashes[0];
                const reason = "Document expired";

                await proxy.connect(certifier).certifyDocuments([hash]);
                await expect(proxy.connect(certifier).revokeCertification(hash, reason))
                    .to.emit(proxy, "CertificationRevoked")
                    .withArgs(hash, certifier.address, reason);
            });

            it("should not allow revocation of uncertified document", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                const hash = sampleHashes[0];

                await expect(proxy.connect(certifier).revokeCertification(hash, "reason"))
                    .to.be.revertedWith("Document not certified");
            });

            it("should track revocations correctly", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                const hash = sampleHashes[0];
                const reason = "Document expired";

                await proxy.connect(certifier).certifyDocuments([hash]);
                await proxy.connect(certifier).revokeCertification(hash, reason);

                const revocations = await proxy.getRevocations(hash);
                expect(revocations.length).to.equal(1);
                expect(revocations[0].revoker).to.equal(certifier.address);
                expect(revocations[0].reason).to.equal(reason);
            });
        });

        describe("Query Functions", function () {
            it("should return certified documents by address", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                await proxy.connect(certifier).certifyDocuments(sampleHashes);

                const certifiedDocs = await proxy.getCertifiedDocumentsByAddress(certifier.address);
                expect(certifiedDocs).to.deep.equal(sampleHashes);
            });

            it("should count revocations by user correctly", async function () {
                const { proxy, certifier } = await loadFixture(deployFixture);
                const hash = sampleHashes[0];

                await proxy.connect(certifier).certifyDocuments([hash]);
                await proxy.connect(certifier).revokeCertification(hash, "reason1");
                await proxy.connect(certifier).revokeCertification(hash, "reason2");

                const revocationCount = await proxy.getRevocationsByUser(hash, certifier.address);
                expect(revocationCount).to.equal(2);
            });
        });
    });
});