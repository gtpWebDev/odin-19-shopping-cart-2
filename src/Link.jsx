import Link from "@mui/material/Link";

import PropTypes from "prop-types";

// separated to avoid clash in Link naming with routing

export default function MuiLink({ children, link, newTab }) {
  return (
    <>
      {newTab ? (
        <Link href={link} target="_blank">
          {children}
        </Link>
      ) : (
        <Link href={link}>{children}</Link>
      )}
    </>
  );
}

MuiLink.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  newTab: PropTypes.bool.isRequired,
};
