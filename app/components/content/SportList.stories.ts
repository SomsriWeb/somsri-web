import type { Meta, StoryObj } from '@storybook/vue3';
import SportList from './SportList.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/SportList',
    component: SportList,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof SportList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SportListStory: Story = {
    args: {},
};
