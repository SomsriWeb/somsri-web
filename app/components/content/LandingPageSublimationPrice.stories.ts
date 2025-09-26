import type { Meta, StoryObj } from '@storybook/vue3';
import LandingPageSublimationPrice from './LandingPageSublimationPrice.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LandingPageSublimationPrice',
	component: LandingPageSublimationPrice,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LandingPageSublimationPrice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPageSublimationPriceStory: Story = {
	args: {

	},
};
