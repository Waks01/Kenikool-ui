import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KCard } from '../Card';

describe('KCard', () => {
  describe('rendering', () => {
    it('renders a div element', () => {
      const { container } = render(<KCard>Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card).toBeTruthy();
    });

    it('renders children content', () => {
      render(<KCard>Test Content</KCard>);
      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('renders with default padding (md)', () => {
      const { container } = render(<KCard>Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-md');
    });

    it('renders with small padding', () => {
      const { container } = render(<KCard padding="sm">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-sm');
    });

    it('renders with large padding', () => {
      const { container } = render(<KCard padding="lg">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-lg');
    });

    it('renders with default shadow (md)', () => {
      const { container } = render(<KCard>Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-md');
    });

    it('renders with small shadow', () => {
      const { container } = render(<KCard shadow="sm">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-sm');
    });

    it('renders with large shadow', () => {
      const { container } = render(<KCard shadow="lg">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-lg');
    });

    it('renders with no shadow', () => {
      const { container } = render(<KCard shadow="none">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-none');
    });

    it('renders with custom className', () => {
      const { container } = render(<KCard className="custom-class">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('custom-class');
    });

    it('renders with all prop combinations', () => {
      const { container } = render(
        <KCard padding="lg" shadow="lg" className="extra">
          Content
        </KCard>
      );
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-lg');
      expect(card?.className).toContain('k-card--shadow-lg');
      expect(card?.className).toContain('extra');
    });
  });

  describe('children rendering', () => {
    it('renders text children', () => {
      render(<KCard>Simple text</KCard>);
      expect(screen.getByText('Simple text')).toBeTruthy();
    });

    it('renders React element children', () => {
      render(
        <KCard>
          <h2>Title</h2>
          <p>Description</p>
        </KCard>
      );
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Description')).toBeTruthy();
    });

    it('renders multiple children', () => {
      render(
        <KCard>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </KCard>
      );
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
      expect(screen.getByText('Third')).toBeTruthy();
    });

    it('renders nested components', () => {
      render(
        <KCard>
          <div>
            <span>Nested</span>
          </div>
        </KCard>
      );
      expect(screen.getByText('Nested')).toBeTruthy();
    });

    it('renders empty card', () => {
      const { container } = render(<KCard></KCard>);
      const card = container.querySelector('.k-card');
      expect(card).toBeTruthy();
    });

    it('renders card with only whitespace', () => {
      const { container } = render(<KCard> </KCard>);
      const card = container.querySelector('.k-card');
      expect(card).toBeTruthy();
    });

    it('renders complex nested structure', () => {
      render(
        <KCard padding="lg" shadow="lg">
          <div>
            <h2>Card Title</h2>
            <div>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
            </div>
            <button>Action</button>
          </div>
        </KCard>
      );
      expect(screen.getByText('Card Title')).toBeTruthy();
      expect(screen.getByText('Paragraph 1')).toBeTruthy();
      expect(screen.getByText('Paragraph 2')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });

  describe('padding variants', () => {
    it('applies small padding class', () => {
      const { container } = render(<KCard padding="sm">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-sm');
    });

    it('applies medium padding class', () => {
      const { container } = render(<KCard padding="md">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-md');
    });

    it('applies large padding class', () => {
      const { container } = render(<KCard padding="lg">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-lg');
    });
  });

  describe('shadow variants', () => {
    it('applies small shadow class', () => {
      const { container } = render(<KCard shadow="sm">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-sm');
    });

    it('applies medium shadow class', () => {
      const { container } = render(<KCard shadow="md">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-md');
    });

    it('applies large shadow class', () => {
      const { container } = render(<KCard shadow="lg">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-lg');
    });

    it('applies no shadow class', () => {
      const { container } = render(<KCard shadow="none">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--shadow-none');
    });
  });

  describe('animations', () => {
    it('renders with animation class when animation prop is set', () => {
      const { container } = render(<KCard animation="fade">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--fade');
    });

    it("renders with no animation class when animation is 'none'", () => {
      const { container } = render(<KCard animation="none">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).not.toContain('k-card--none');
    });

    it('renders with pulse animation', () => {
      const { container } = render(<KCard animation="pulse">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--pulse');
    });

    it('renders with scale animation', () => {
      const { container } = render(<KCard animation="scale">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--scale');
    });
  });

  describe('HTML attributes', () => {
    it('passes through aria-label attribute', () => {
      const { container } = render(<KCard aria-label="Card section">Content</KCard>);
      const card = container.querySelector("[aria-label='Card section']");
      expect(card).toBeTruthy();
    });

    it('passes through data attributes', () => {
      const { container } = render(<KCard data-testid="custom-card">Content</KCard>);
      const card = container.querySelector("[data-testid='custom-card']");
      expect(card).toBeTruthy();
    });

    it('passes through id attribute', () => {
      const { container } = render(<KCard id="my-card">Content</KCard>);
      const card = container.querySelector('#my-card');
      expect(card).toBeTruthy();
    });

    it('passes through role attribute', () => {
      const { container } = render(
        <KCard role="region" aria-label="Main content">
          Content
        </KCard>
      );
      const card = container.querySelector("[role='region']");
      expect(card).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('handles very long content', () => {
      const longContent = 'a'.repeat(1000);
      render(<KCard>{longContent}</KCard>);
      expect(screen.getByText(longContent)).toBeTruthy();
    });

    it('handles special characters in content', () => {
      render(<KCard>!@#$%^&*()</KCard>);
      expect(screen.getByText('!@#$%^&*()')).toBeTruthy();
    });

    it('handles HTML entities in content', () => {
      render(<KCard>&lt;div&gt;</KCard>);
      expect(screen.getByText('<div>')).toBeTruthy();
    });

    it('renders with style prop', () => {
      const { container } = render(<KCard style={{ backgroundColor: 'red' }}>Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.getAttribute('style')).toContain('background-color');
    });

    it('renders with multiple className combinations', () => {
      const { container } = render(
        <KCard padding="lg" shadow="lg" className="custom-1 custom-2 custom-3">
          Content
        </KCard>
      );
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-lg');
      expect(card?.className).toContain('k-card--shadow-lg');
      expect(card?.className).toContain('custom-1');
      expect(card?.className).toContain('custom-2');
      expect(card?.className).toContain('custom-3');
    });
  });

  describe('all prop combinations', () => {
    it('renders with all props combined', () => {
      const { container } = render(
        <KCard
          padding="lg"
          shadow="lg"
          animation="fade"
          className="extra"
          id="card-1"
          data-testid="test-card"
        >
          <h2>Title</h2>
          <p>Content</p>
        </KCard>
      );
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card--padding-lg');
      expect(card?.className).toContain('k-card--shadow-lg');
      expect(card?.className).toContain('k-card--fade');
      expect(card?.className).toContain('extra');
      expect(card?.getAttribute('id')).toBe('card-1');
      expect(card?.getAttribute('data-testid')).toBe('test-card');
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Content')).toBeTruthy();
    });
  });

  describe('className merging', () => {
    it('merges default classes with custom className', () => {
      const { container } = render(<KCard className="custom">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card');
      expect(card?.className).toContain('custom');
    });

    it('preserves all padding and shadow classes with custom className', () => {
      const { container } = render(
        <KCard padding="lg" shadow="lg" className="my-custom">
          Content
        </KCard>
      );
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('k-card');
      expect(card?.className).toContain('k-card--padding-lg');
      expect(card?.className).toContain('k-card--shadow-lg');
      expect(card?.className).toContain('my-custom');
    });

    it('handles multiple custom classes', () => {
      const { container } = render(<KCard className="class1 class2 class3">Content</KCard>);
      const card = container.querySelector('.k-card');
      expect(card?.className).toContain('class1');
      expect(card?.className).toContain('class2');
      expect(card?.className).toContain('class3');
    });
  });

  describe('accessibility', () => {
    it('supports aria-label attribute', () => {
      const { container } = render(<KCard aria-label="Product card">Content</KCard>);
      const card = container.querySelector("[aria-label='Product card']");
      expect(card).toBeTruthy();
    });

    it('supports role attribute', () => {
      const { container } = render(<KCard role="region">Content</KCard>);
      const card = container.querySelector("[role='region']");
      expect(card).toBeTruthy();
    });

    it('supports role with aria-label', () => {
      const { container } = render(
        <KCard role="region" aria-label="Main content">
          Content
        </KCard>
      );
      const card = container.querySelector("[role='region'][aria-label='Main content']");
      expect(card).toBeTruthy();
    });

    it('supports article role', () => {
      const { container } = render(<KCard role="article">Content</KCard>);
      const card = container.querySelector("[role='article']");
      expect(card).toBeTruthy();
    });

    it('supports complementary role', () => {
      const { container } = render(<KCard role="complementary">Content</KCard>);
      const card = container.querySelector("[role='complementary']");
      expect(card).toBeTruthy();
    });

    it('supports aria-label with other attributes', () => {
      const { container } = render(
        <KCard aria-label="Card section" padding="lg" shadow="lg" className="custom">
          Content
        </KCard>
      );
      const card = container.querySelector("[aria-label='Card section']");
      expect(card?.className).toContain('k-card--padding-lg');
      expect(card?.className).toContain('k-card--shadow-lg');
      expect(card?.className).toContain('custom');
    });

    it('supports semantic HTML structure inside card', () => {
      render(
        <KCard role="region" aria-label="Article">
          <article>
            <h2>Title</h2>
            <p>Content</p>
          </article>
        </KCard>
      );
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Content')).toBeTruthy();
    });

    it('maintains semantic structure with nested headings', () => {
      render(
        <KCard>
          <h1>Main Title</h1>
          <h2>Subtitle</h2>
          <p>Content</p>
        </KCard>
      );
      expect(screen.getByText('Main Title')).toBeTruthy();
      expect(screen.getByText('Subtitle')).toBeTruthy();
    });

    it('supports interactive content inside card', () => {
      render(
        <KCard>
          <button>Action</button>
          <a href="#">Link</a>
        </KCard>
      );
      expect(screen.getByRole('button')).toBeTruthy();
      expect(screen.getByRole('link')).toBeTruthy();
    });

    it('supports form elements inside card', () => {
      render(
        <KCard>
          <input type="text" aria-label="Name" />
          <button>Submit</button>
        </KCard>
      );
      expect(screen.getByLabelText('Name')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });
});
