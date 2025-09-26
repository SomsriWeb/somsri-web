import type { Meta, StoryObj } from '@storybook/vue3';
import LandingPagePin from './LandingPagePin.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
	title: 'Components/LandingPagePin',
	component: LandingPagePin,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof LandingPagePin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LandingPagePinStory: Story = {
	args: {},
};
