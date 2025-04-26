import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import {DocumentCertification__factory} from "../typechain-types";

describe("DocumentCertification", function () {
    async function deployFixture() {
        const [owner, other] = await ethers.getSigners();
        const factory = new DocumentCertification__factory(owner);
        const proxy = await upgrades.deployProxy(factory, []);
        await proxy.waitForDeployment();
        return { proxy, owner, other };
    }

    describe("Initialization", function () {
        it("starts with no certification", async function () {
            const { proxy } = await loadFixture(deployFixture);
            const zero = ethers.ZeroHash;
            expect(await proxy.isDocumentCertified(zero)).to.be.false;
        });
    });

    describe("certifyDocument()", function () {
        const sampleHash = ethers.keccak256(ethers.toUtf8Bytes("doc.pdf"));

        it("rejects empty hash", async function () {
            const { proxy } = await loadFixture(deployFixture);
            await expect(proxy.certifyDocument(ethers.ZeroHash))
                .to.be.revertedWith("Invalid hash");
        });

        it("certifies and emits event", async function () {
            const { proxy, owner } = await loadFixture(deployFixture);
            await expect(proxy.certifyDocument(sampleHash))
                .to.emit(proxy, "DocumentCertified")
                .withArgs(sampleHash, owner.address);

            expect(await proxy.isDocumentCertified(sampleHash)).to.be.true;
            expect(await proxy.isCertifiedBy(owner.address, sampleHash)).to.be.true;
        });

        it("cannot certify twice", async function () {
            const { proxy } = await loadFixture(deployFixture);
            await proxy.certifyDocument(sampleHash);
            await expect(proxy.certifyDocument(sampleHash))
                .to.be.revertedWith("Document already certified");
        });

        it("only original certifier is recognized", async function () {
            const { proxy, other, owner } = await loadFixture(deployFixture);
            await proxy.certifyDocument(sampleHash);
            expect(await proxy.isCertifiedBy(other.address, sampleHash)).to.be.false;
            expect(await proxy.isCertifiedBy(owner.address, sampleHash)).to.be.true;
        });
    });

    describe("view functions", function () {
        it("isDocumentCertified returns false before, true after", async function () {
            const { proxy } = await loadFixture(deployFixture);
            const h = ethers.keccak256(ethers.toUtf8Bytes("test"));
            expect(await proxy.isDocumentCertified(h)).to.be.false;
            await proxy.certifyDocument(h);
            expect(await proxy.isDocumentCertified(h)).to.be.true;
        });
    });
});
