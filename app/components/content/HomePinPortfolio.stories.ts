import type { Meta, StoryObj } from '@storybook/vue3';
import HomePinPortfolio from './HomePinPortfolio.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/HomePinPortfolio',
	component: HomePinPortfolio,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof HomePinPortfolio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePinPortfolioStory: Story = {
	args: {
	lang: 'en',
  },
};
