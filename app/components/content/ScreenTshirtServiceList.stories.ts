import type { Meta, StoryObj } from '@storybook/vue3';
import ScreenTshirtServiceList from './ScreenTshirtServiceList.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/ScreenTshirtServiceList',
    component: ScreenTshirtServiceList,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof ScreenTshirtServiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScreenTshirtServiceListStory: Story = {
    args: {
        items: 2,
    },
};
