import type { Meta, StoryObj } from '@storybook/vue3';
import TshirtFactoryFaq from './TshirtFactoryFaq.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/TshirtFactoryFaq',
    component: TshirtFactoryFaq,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof TshirtFactoryFaq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TshirtFactoryFaqStory: Story = {
    args: {},
};
