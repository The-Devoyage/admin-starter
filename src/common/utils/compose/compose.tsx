/*eslint-disable*/

interface Props {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
  value?: any;
}

export const Compose = (props: Props) => {
  const { components = [], children, ...rest } = props;

  return (
    <>
      {components.reduceRight(
        (acc, Comp) => (
          <Comp {...rest}>{acc}</Comp>
        ),
        children,
      )}
    </>
  );
};
