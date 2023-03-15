import { FacebookTimelineBehavior } from "./facebook";
import { InstagramPostsBehavior } from "./instagram";
import { TelegramBehavior } from "./telegram";
import { TwitterTimelineBehavior } from "./twitter";
import { TikTokVideoBehavior, TikTokProfileBehavior } from "./tiktok";
import { Statstidende } from "./statstidende";

const siteBehaviors = [
	InstagramPostsBehavior,
	TwitterTimelineBehavior,
	FacebookTimelineBehavior,
	TelegramBehavior,
	TikTokVideoBehavior,
	TikTokProfileBehavior,
	Statstidende,
];

export default siteBehaviors;
