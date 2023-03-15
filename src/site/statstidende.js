import { Behavior } from "../lib/behavior";
import { waitUnit, xpathNode, sleep, xpathNodes } from "../lib/utils";
export class Statstidende extends Behavior {
	static isMatch() {
		return window.location.href.match(
			/https:\/\/(www\.)?statstidende\.dk\/\w[\w.-]+/
		);
	}

	static get name() {
		return "Statstidende";
	}
	constructor() {
		super();
		this.state = {
			pdfs: 0,
		};
		this.nextButtonXPath = "//button[@aria-label='Næste side']";
		this.downloadPdfPath = "//a[@title='Hent PDF']";
	}

	async *iterPages() {
		let button = xpathNode(this.nextButtonXPath);
		while (button != null) {
			button.click();
			await sleep(waitUnit * 10);
			button = xpathNode(this.nextButtonXPath);
			yield;
		}
	}

	async *iterDownloads() {
		for (let index = 1; index <= 10; index++) {
			const node = xpathNode(
				`//div[@class='publications-list']/div[${index}]//a[@title='Hent PDF']`
			);
			node.scrollIntoView(this.scrollOpts);
			node.click();
			await sleep(waitUnit * 10);
			yield this.getState("Downloaded pdf", "pdfs");
		}
	}

	async *[Symbol.asyncIterator]() {
		const origLoc = window.location.href;
		for await (const _ of this.iterPages()) {
			yield this.getState("Loading Page", "page");
			yield* this.iterDownloads();
		}

		console.log(origLoc);
	}
}
