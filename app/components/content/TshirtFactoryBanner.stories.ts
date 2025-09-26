import type { Meta, StoryObj } from '@storybook/vue3';
import TshirtFactoryBanner from './TshirtFactoryBanner.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/TshirtFactoryBanner',
    component: TshirtFactoryBanner,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof TshirtFactoryBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TshirtFactoryBannerStory: Story = {
    args: {},
};
