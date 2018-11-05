import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import * as classNames from "classnames";
import * as React from "react";

import { ListProps } from "../../..";
import Skeleton from "../../../components/Skeleton";
import TablePagination from "../../../components/TablePagination";
import i18n from "../../../i18n";
import { renderCollection } from "../../../misc";
import { StaffList_staffUsers_edges_node } from "../../types/StaffList";

interface StaffListProps extends ListProps {
  staffMembers: StaffList_staffUsers_edges_node[];
}

const decorate = withStyles({
  statusText: {
    color: "#9E9D9D"
  },
  tableRow: {
    cursor: "pointer" as "pointer"
  },
  wideColumn: {
    width: "80%"
  }
});
const StaffList = decorate<StaffListProps>(
  ({
    classes,
    disabled,
    onNextPage,
    onPreviousPage,
    onRowClick,
    pageInfo,
    staffMembers
  }) => (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.wideColumn}>
              {i18n.t("Name", { context: "object" })}
            </TableCell>
            <TableCell>
              {i18n.t("Email Address", { context: "object" })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              hasNextPage={
                pageInfo && !disabled ? pageInfo.hasNextPage : undefined
              }
              onNextPage={onNextPage}
              hasPreviousPage={
                pageInfo && !disabled ? pageInfo.hasPreviousPage : undefined
              }
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            staffMembers,
            staffMember => (
              <TableRow
                className={classNames({
                  [classes.tableRow]: !!staffMember
                })}
                hover={!!staffMember}
                onClick={!!staffMember ? onRowClick(staffMember.id) : undefined}
                key={staffMember ? staffMember.id : "skeleton"}
              >
                <TableCell>
                  {staffMember &&
                  staffMember.firstName &&
                  staffMember.lastName !== undefined ? (
                    <>
                      <Typography>
                        {`${staffMember.firstName} ${staffMember.lastName}`}
                      </Typography>
                      <Typography
                        variant={"caption"}
                        className={classes.statusText}
                      >
                        {staffMember.isActive
                          ? i18n.t("Active", { context: "status" })
                          : i18n.t("Inactive", { context: "status" })}
                      </Typography>
                    </>
                  ) : (
                    <Skeleton style={{ width: "10em" }} />
                  )}
                </TableCell>
                <TableCell>
                  {staffMember ? (
                    <span onClick={onRowClick(staffMember.id)}>
                      {staffMember.email}
                    </span>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={2}>
                  {i18n.t("No staff members found")}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  )
);
StaffList.displayName = "StaffList";
export default StaffList;
