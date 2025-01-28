import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button/Button";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import UserProfileCard from "../../../../components/Card/UserProfileCard";
import { ConfigGenerator } from "../../../../utils/formConfigs";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../../../utils/apiRequest";
import errorMessages from "../../../../statusMessages/error";
import PropTypes from "prop-types";


const UserSubscription = ({ user, openModal, setSubmitStatus }) => {
    const [subscribeOptions, setSubscribeOptions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(user.subscription?.options?.map((opt) => opt.id) || []);
    const configGenerator = new ConfigGenerator();

    const fetchSubscribeOptions = useCallback(async () => {
        setIsFetching(true);
        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-allSubscribeOptions`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setSubscribeOptions(response.data);
            } else {
                setSubmitStatus(response.data);
            }
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        } finally {
            setIsFetching(false);
        }
    }, [setSubmitStatus]);

    useEffect(() => {
        fetchSubscribeOptions();
    }, [fetchSubscribeOptions]);

    const checkForChanges = useCallback((current, initial) => {
        if (current.length !== initial.length) return true;
        return current.some((option) => !initial.includes(option)) || initial.some((option) => !current.includes(option));
    }, []);

    useEffect(() => {
        setHasChanges(checkForChanges(selectedOptions, user.subscription?.options?.map((opt) => opt.id) || []));
    }, [selectedOptions, user.subscription?.options, checkForChanges]);

    const saveSubscriptionChanges = useCallback(async () => {
        try {
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/update-selectedSubscriber/${user.subscription.id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedOptions),
            });

            setSubmitStatus(response.data);
            if (response.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR);
        }
    }, [selectedOptions, setSubmitStatus, user.subscription?.id]);

    const handleToggle = useCallback((optionId) => {
        setSelectedOptions((prev) => {
            const newOptions = prev.includes(optionId)
                ? prev.filter((id) => id !== optionId)
                : [...prev, optionId];
            return newOptions;
        });
    }, []);

    const renderedSubscribeOptions = useMemo(() => {
        if (isFetching) return <p>Məlumatlar yüklənir!</p>;
        if (!subscribeOptions.length) return <p>Məlumat yoxdur!</p>;

        return subscribeOptions.map((subscribeOption) => (
            <div key={subscribeOption.id} className="mt-2">
                <h6 className="text-uppercase text-body text-xs font-weight-bolder">
                    {subscribeOption.group}
                </h6>
                <ul className="list-group">
                    {subscribeOption.options.map((option) => (
                        <li className="list-group-item border-0 px-0 pb-0" key={option.id}>
                            <div className="form-check form-switch ps-0">
                                <input
                                    className="form-check-input ms-auto"
                                    value={option.id || ""}
                                    type="checkbox"
                                    id={option.label}
                                    checked={selectedOptions.includes(option.id)}
                                    onChange={() => handleToggle(option.id)}
                                />
                                <label
                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                    htmlFor={option.label}
                                >
                                    {option.description}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    }, [isFetching, subscribeOptions, selectedOptions, handleToggle]);

    return (
        <div className="col-12 col-xl-4">
            <UserProfileCard classList="max-height-400 overflow-x-hidden">
                <CardHeader title="Abunəlik məlumatları">
                    {user.subscription && (
                        <Button
                            disabled={!hasChanges}
                            asButton={true}
                            classList="border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0"
                            onClick={saveSubscriptionChanges}
                        >
                            Yadda saxla
                        </Button>
                    )}
                </CardHeader>
                <CardBody classList="p-3">
                    {!user.subscription ? (
                        <Button
                            classList="border-0 bg-transparent w-100 h-100"
                            asButton={true}
                            onClick={() =>
                                openModal(
                                    "Abunəliyi aktiv et",
                                    "md",
                                    { config: configGenerator.generateUserSubscription('add', user.id), initialData: user }
                                )
                            }
                            style={{ fontSize: "16px" }}
                        >
                            <FontAwesomeIcon icon={faLock} fontSize="28px" />
                            <p>Abunəlik aktiv deyil. Aktifləşdirmək üçün təsdiqləyin!</p>
                        </Button>
                    ) : (
                        renderedSubscribeOptions
                    )}
                </CardBody>
            </UserProfileCard>
        </div>
    );
};

UserSubscription.propTypes = {
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    setSubmitStatus: PropTypes.func.isRequired,
};

export default UserSubscription;