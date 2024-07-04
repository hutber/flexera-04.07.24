import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RepoItemSkeleton from '@/app/components/RepoItem/RepoItemSkeleton';

describe('RepoItemSkeleton', () => {
  it('renders the skeleton loaders', async () => {
    const { findByLabelText } = render(<RepoItemSkeleton />);

    // Check if all skeleton elements are rendered using aria-label
    const avatarSkeleton = await findByLabelText('Avatar skeleton');
    const nameSkeleton = await findByLabelText('Name skeleton');
    const descriptionSkeleton = await findByLabelText('Description skeleton');
    const buttonSkeleton = await findByLabelText('Button skeleton');

    expect(avatarSkeleton).not.toBeNull();
    expect(nameSkeleton).not.toBeNull();
    expect(descriptionSkeleton).not.toBeNull();
    expect(buttonSkeleton).not.toBeNull();
  });
});
