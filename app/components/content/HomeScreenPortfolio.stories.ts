import type { Meta, StoryObj } from '@storybook/vue3';
import HomeScreenPortfolio from './HomeScreenPortfolio.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/HomeScreenPortfolio',
	component: HomeScreenPortfolio,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof HomeScreenPortfolio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeScreenPortfolioStory: Story = {
	args: {
	lang: "en",
  },
};
