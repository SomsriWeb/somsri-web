import type { Meta, StoryObj } from '@storybook/vue3';
import BlogHeader from './BlogHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/BlogHeader',
    component: BlogHeader,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof BlogHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogHeaderStory: Story = {
    args: {
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        alt: 'Blog Title',
    },
};
