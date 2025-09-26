import type { Meta, StoryObj } from '@storybook/vue3';
import CompanyIntro from './CompanyIntro.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/CompanyIntro',
	component: CompanyIntro,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof CompanyIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompanyIntroStory: Story = {
	args: {},
};
