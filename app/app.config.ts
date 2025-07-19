export default defineAppConfig({
	seo: {
		title: "สมศรีมีเสื้อ",
		description:
			"เราเป็น โรงงานผลิตเสื้อ สั่งผลิตเสื้อยืดพร้อมสกรีน คุณภาพดี ราคาส่ง รับผลิตและจำหน่ายเสื้อ พร้อมสกรีนโลโก้ ทำแบรนด์ตัวเอง",
		url: "https://somsritshirt.com",
	},
	socialMedia: {
		instagram: "https://www.instagram.com/somsritshirt/",
		facebook: "https://facebook.com/somsritshirt",
		tiktok: "https://www.tiktok.com/somsritshirt",
		line: "https://line.me/R/ti/p/diz8986o",
	},
	ui: {
		button: {
			slots: {
				base: [
					"rounded-lg font-medium font-stretch-condensed inline-flex justify-center items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 !min-w-[6rem]",
					"transition-colors",
					"cursor-pointer",
				],
				label: "truncate",
				leadingIcon: "shrink-0",
				leadingAvatar: "shrink-0",
				leadingAvatarSize: "",
				trailingIcon: "shrink-0",
			},
			variants: {
				buttonGroup: {
					horizontal:
						"not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
					vertical:
						"not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]",
				},
				color: {
					primary: "",
					secondary: "",
					success: "",
					info: "",
					warning: "",
					error: "",
					neutral: "",
					line: "",
				},
				variant: {
					solid: "",
					outline: "",
					soft: "",
					subtle: "",
					ghost: "",
					link: "",
				},
				size: {
					xs: {
						base: "px-2 py-1 gap-1",
						leadingIcon: "size-4",
						leadingAvatarSize: "3xs",
						trailingIcon: "size-4",
					},
					sm: {
						base: "px-2.5 py-1 gap-1.5",
						leadingIcon: "size-4",
						leadingAvatarSize: "3xs",
						trailingIcon: "size-4",
					},
					md: {
						base: "px-5 py-1 gap-1.5 text-lg leading-none",
						leadingIcon: "size-5",
						leadingAvatarSize: "2xs",
						trailingIcon: "size-5",
					},
					lg: {
						base: "px-3 py-1 gap-2",
						leadingIcon: "size-5",
						leadingAvatarSize: "2xs",
						trailingIcon: "size-5",
					},
					xl: {
						base: "px-3 py-0.5 gap-2 text-xl",
						leadingIcon: "size-6",
						leadingAvatarSize: "xs",
						trailingIcon: "size-6",
					},
				},
				block: {
					true: {
						base: "w-full justify-center",
						trailingIcon: "ms-auto",
					},
				},
				square: {
					true: "",
				},
				leading: {
					true: "",
				},
				trailing: {
					true: "",
				},
				loading: {
					true: "",
				},
				active: {
					true: {
						base: "",
					},
					false: {
						base: "",
					},
				},
			},
			compoundVariants: [
				// PRIMARY
				{
					color: "primary",
					variant: "solid",
					class: "text-inverted bg-primary hover:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
				},
				{
					color: "primary",
					variant: "outline",
					class: "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				},
				{
					color: "primary",
					variant: "soft",
					class: "text-primary bg-primary/10 hover:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10",
				},
				{
					color: "primary",
					variant: "subtle",
					class: "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				},
				{
					color: "primary",
					variant: "ghost",
					class: "text-primary hover:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent",
				},
				{
					color: "primary",
					variant: "link",
					class: "text-primary hover:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
				},

				//LINE
				{
					color: "line",
					variant: "solid",
					class: "text-inverted bg-line hover:bg-line/75 disabled:bg-line aria-disabled:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-line",
				},
				{
					color: "line",
					variant: "outline",
					class: "ring ring-inset ring-line/50 text-line hover:bg-line/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-line",
				},
				{
					color: "line",
					variant: "soft",
					class: "text-line bg-line/10 hover:bg-line/15 focus:outline-none focus-visible:bg-line/15 disabled:bg-line/10 aria-disabled:bg-line/10",
				},
				{
					color: "line",
					variant: "subtle",
					class: "text-line ring ring-inset ring-line/25 bg-line/10 hover:bg-line/15 disabled:bg-line/10 aria-disabled:bg-line/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-line",
				},
				{
					color: "line",
					variant: "ghost",
					class: "text-line hover:bg-line/10 focus:outline-none focus-visible:bg-line/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent",
				},
				{
					color: "line",
					variant: "link",
					class: "text-line hover:text-line/75 disabled:text-line aria-disabled:text-line focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-line",
				},

				// NEUTRAL
				{
					color: "neutral",
					variant: "solid",
					class: "text-primary bg-white hover:bg-white/90 disabled:bg-white aria-disabled:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
				},
				{
					color: "neutral",
					variant: "outline",
					class: "ring ring-inset ring-accented text-default bg-default hover:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
				},
				{
					color: "neutral",
					variant: "soft",
					class: "text-default bg-elevated hover:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated",
				},
				{
					color: "neutral",
					variant: "subtle",
					class: "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
				},
				{
					color: "neutral",
					variant: "ghost",
					class: "text-default hover:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent",
				},
				{
					color: "neutral",
					variant: "link",
					class: "text-muted hover:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white",
				},
				{
					size: "xs",
					square: true,
					class: "p-1",
				},
				{
					size: "sm",
					square: true,
					class: "p-1.5",
				},
				{
					size: "md",
					square: true,
					class: "p-1.5",
				},
				{
					size: "lg",
					square: true,
					class: "p-2",
				},
				{
					size: "xl",
					square: true,
					class: "p-2",
				},
				{
					loading: true,
					leading: true,
					class: {
						leadingIcon: "animate-spin",
					},
				},
				{
					loading: true,
					leading: false,
					trailing: true,
					class: {
						trailingIcon: "animate-spin",
					},
				},
			],
			defaultVariants: {
				color: "primary",
				variant: "solid",
				size: "md",
			},
		},
	},
})
