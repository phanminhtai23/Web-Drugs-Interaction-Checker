import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInteractionsByActiveIngredient } from "../services/interactionService";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Fab,
    Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScienceIcon from "@mui/icons-material/Science";

const ActiveIngredientInteractionsPage = () => {
    const { ingredientName } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                setLoading(true);
                setError("");
                // Cuộn lên đầu trang ngay khi vào trang này (trước khi load data)
                window.scrollTo({ top: 0, behavior: "instant" });

                const decodedIngredientName =
                    decodeURIComponent(ingredientName);
                console.log(
                    "Fetching interactions for:",
                    decodedIngredientName
                );
                const result = await getInteractionsByActiveIngredient(
                    decodedIngredientName
                );
                // console.log("API Response:", result);
                setData(result);
            } catch (err) {
                console.error("Error fetching interactions:", err);
                console.error("Error details:", {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status,
                });
                const errorMessage =
                    err.response?.data?.message ||
                    err.message ||
                    "Không thể tải dữ liệu tương tác. Vui lòng thử lại sau.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (ingredientName) {
            fetchInteractions();
        } else {
            setError("Tên hoạt chất không hợp lệ");
            setLoading(false);
        }
    }, [ingredientName]);

    const getSeverityColor = (severity) => {
        const severityLower = severity?.toLowerCase() || "";
        if (
            severityLower.includes("nghiêm trọng") ||
            severityLower.includes("major")
        ) {
            return "error";
        }
        if (
            severityLower.includes("trung bình") ||
            severityLower.includes("moderate")
        ) {
            return "warning";
        }
        if (severityLower.includes("nhẹ") || severityLower.includes("minor")) {
            return "info";
        }
        return "default";
    };

    const getSeverityIcon = (severity) => {
        const severityLower = severity?.toLowerCase() || "";
        if (
            severityLower.includes("nghiêm trọng") ||
            severityLower.includes("major")
        ) {
            return <ErrorIcon />;
        }
        if (
            severityLower.includes("trung bình") ||
            severityLower.includes("moderate")
        ) {
            return <WarningAmberIcon />;
        }
        return <InfoIcon />;
    };

    if (loading) {
        return (
            <Box
                className="container"
                sx={{
                    mt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 1, sm: 2, md: 3 },
                    pb: { xs: 2, sm: 3, md: 4 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                className="container"
                sx={{
                    mt: { xs: 2, sm: 3, md: 5 },
                    px: { xs: 1, sm: 2, md: 3 },
                    pb: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Alert severity="error">{error}</Alert>
                <Tooltip title="Quay lại" placement="left">
                    <Fab
                        color="primary"
                        aria-label="back"
                        onClick={() => navigate("/active-ingredients")}
                        sx={{
                            position: "fixed",
                            bottom: { xs: 24, sm: 32 },
                            right: { xs: 16, sm: 24 },
                            zIndex: 1000,
                        }}
                    >
                        <ArrowBackIcon />
                    </Fab>
                </Tooltip>
            </Box>
        );
    }

    const decodedIngredientName = decodeURIComponent(ingredientName);

    return (
        <Box
            className="container"
            sx={{
                mt: { xs: 2, sm: 3, md: 5 },
                px: { xs: 1, sm: 2, md: 3 },
                pb: { xs: 2, sm: 3, md: 4 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                }}
            >
                <ScienceIcon
                    sx={{
                        fontSize: { xs: "2rem", sm: "2.5rem" },
                        color: "primary.main",
                    }}
                />
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    }}
                >
                    Tương tác của hoạt chất: {decodedIngredientName}
                </Typography>
            </Box>

            {!data?.hasInteractions ? (
                <Alert severity="info" sx={{ mb: 3 }}>
                    {data?.message || "Không tìm thấy tương tác nào"}
                </Alert>
            ) : (
                <>
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {data.message} - Tổng cộng: {data.totalInteractions}{" "}
                        tương tác
                    </Alert>

                    {Object.entries(data.interactions).map(
                        ([severity, interactions]) => (
                            <Accordion
                                key={severity}
                                defaultExpanded={true}
                                sx={{ mb: 2 }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            width: "100%",
                                        }}
                                    >
                                        {getSeverityIcon(severity)}
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold", flex: 1 }}
                                        >
                                            {severity} ({interactions.length}{" "}
                                            tương tác)
                                        </Typography>
                                        <Chip
                                            label={severity}
                                            color={getSeverityColor(severity)}
                                            size="small"
                                        />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 2,
                                        }}
                                    >
                                        {interactions.map(
                                            (interaction, index) => (
                                                <Paper
                                                    key={
                                                        interaction.id || index
                                                    }
                                                    elevation={2}
                                                    sx={{
                                                        p: 2,
                                                        borderLeft: `4px solid ${
                                                            getSeverityColor(
                                                                interaction.mucDoNghiemTrong
                                                            ) === "error"
                                                                ? "#f44336"
                                                                : getSeverityColor(
                                                                      interaction.mucDoNghiemTrong
                                                                  ) ===
                                                                  "warning"
                                                                ? "#ff9800"
                                                                : "#2196f3"
                                                        }`,
                                                    }}
                                                >
                                                    <Box sx={{ mb: 1.5 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            Cặp hoạt chất:
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                gap: 1,
                                                                flexWrap:
                                                                    "wrap",
                                                                mb: 1,
                                                            }}
                                                        >
                                                            <Chip
                                                                label={
                                                                    interaction.hoatChat1
                                                                }
                                                                icon={
                                                                    <ScienceIcon />
                                                                }
                                                                color="primary"
                                                                variant="outlined"
                                                            />
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    alignSelf:
                                                                        "center",
                                                                }}
                                                            >
                                                                ↔
                                                            </Typography>
                                                            <Chip
                                                                label={
                                                                    interaction.hoatChat2
                                                                }
                                                                icon={
                                                                    <ScienceIcon />
                                                                }
                                                                color="primary"
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ mb: 1 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            Mức độ nghiêm trọng:
                                                        </Typography>
                                                        <Chip
                                                            label={
                                                                interaction.mucDoNghiemTrong
                                                            }
                                                            color={getSeverityColor(
                                                                interaction.mucDoNghiemTrong
                                                            )}
                                                            size="small"
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            Cảnh báo:
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                whiteSpace:
                                                                    "pre-wrap",
                                                                lineHeight: 1.6,
                                                                color: "text.primary",
                                                            }}
                                                        >
                                                            {
                                                                interaction.canhBao
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            )
                                        )}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        )
                    )}
                </>
            )}

            {/* Floating Action Button - Quay lại */}
            <Tooltip title="Quay lại danh sách hoạt chất" placement="left">
                <Fab
                    color="primary"
                    aria-label="back"
                    onClick={() => navigate("/active-ingredients")}
                    sx={{
                        position: "fixed",
                        bottom: { xs: 24, sm: 32 },
                        right: { xs: 16, sm: 24 },
                        zIndex: 1000,
                    }}
                >
                    <ArrowBackIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
};

export default ActiveIngredientInteractionsPage;
