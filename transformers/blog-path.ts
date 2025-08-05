import { defineTransformer } from "@nuxt/content"

export default defineTransformer({
	name: "blog-path",
	extensions: [".md"],
	transform(file) {
		// if (file.id.startsWith("content/blog/")) {
		// 	const newPath = file.id
		// 		.replace("content/blog/", "/")
		// 		.replace(/\.md$/, "")
		// 		.replace(/\/index$/, "")
		// 	file.body = file.body.replace(/---([\s\S]*?)---/, (match, frontmatter) => {
		// 		if (!/path:/.test(frontmatter)) {
		// 			return `---\npath: /${newPath}\n${frontmatter}---`
		// 		}
		// 		return match
		// 	})
		// }

		if (file.id === "content/blog.md") {
			console.log(file.body)
		}
		return file
	},
})
