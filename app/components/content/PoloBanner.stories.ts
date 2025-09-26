import type { Meta, StoryObj } from '@storybook/vue3';
import PoloBanner from './PoloBanner.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PoloBanner',
    component: PoloBanner,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PoloBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PoloBannerStory: Story = {
    args: {},
};
