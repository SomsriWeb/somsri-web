import type { Meta, StoryObj } from '@storybook/vue3';
import BlogItem from './BlogItem.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/BlogItem',
    component: BlogItem,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof BlogItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogItemStory: Story = {
    args: {
        blog: {},
        
    },
};
